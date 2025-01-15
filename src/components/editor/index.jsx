import React from 'react';
import axios from '../../axios';
import {
    MDXEditor, toolbarPlugin, BoldItalicUnderlineToggles,
    CreateLink, UndoRedo, CodeToggle, InsertImage,
    linkDialogPlugin, linkPlugin, imagePlugin, sandpackPlugin, InsertSandpack, jsxPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import Styles from './editor.module.scss'

const simpleSandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'dark',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: `<div></div>`
        }
    ]
}

const imageUploadHandler = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    const { data } = await axios.post('/upload', formData);

    return data.url;
}

const editor = (props) => {
    return (
        <div className={Styles.editor}>  
            <MDXEditor placeholder = "Введите текст..." className={Styles.editor__input} markdown="" value={props.value} onChange={props.onChange} plugins={
                [
                    linkDialogPlugin(),
                    linkPlugin(),
                    imagePlugin({ imageUploadHandler }),
                    sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
                    jsxPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <CodeToggle />
                                <CreateLink />
                                <InsertImage />
                            </>
                        )
                    }),
                ]}
            />
            {
                props.error ? (
                    <div className={Styles.error}>{props.error}</div>
                ) : ""
            }
        </div>
    )
}

export default editor;