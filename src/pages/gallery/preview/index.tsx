import { type FC } from "react";
import Layout from "../../layout";
import PreviewDialog from "./PreviewDialog";
import SkeletonFilmsCaraousel from "./SkeletonFilmsCaraousel";

const GalleryPagePreview: FC = () => {
  return (
    <>
      <PreviewDialog open />
      <Layout heading="Your film gallery" route="Gallery">
        <div className="w-full flex flex-col justify-start items-center gap-3">
          <SkeletonFilmsCaraousel title="Known for" />
          <SkeletonFilmsCaraousel title="Directed" />
          <SkeletonFilmsCaraousel title="Reviewed" />
        </div>
      </Layout>
    </>
  );
};

export default GalleryPagePreview;
