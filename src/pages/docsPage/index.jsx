import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoc } from "../../redux/slices/docsSlices";

import { useParams } from "react-router-dom";

import Content from "../../components/content";
import ContentSkeleton from "../../components/contentSkeleton";

function docsPage() {
    const { shortUrl } = useParams();

    const dispatch = useDispatch();
    const { docs } = useSelector((state) => state.docs);

    React.useEffect(() => {
        dispatch(fetchDoc(shortUrl));
    }, [shortUrl]);

    return docs.status === "loading" ? (
        <ContentSkeleton />
    ) : (
        <Content title={docs.items.data.title} text={docs.items.data.text} />
    );
}

export default docsPage;
