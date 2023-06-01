import { type FC } from "react";
import Layout from "../../layout";
import PreviewDialog from "./PreviewDialog";
import SkeletonFilmsCaraousel from "./SkeletonFilmsCaraousel";

const GalleryPagePreview: FC = () => {
  return (
    <>
      <PreviewDialog open />
      <Layout heading="Your film gallery" route="Gallery">
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <SkeletonFilmsCaraousel title="Known for" />
          <SkeletonFilmsCaraousel title="Directed" />
          <SkeletonFilmsCaraousel title="Reviewed" />
        </div>
      </Layout>
    </>
  );
};

export default GalleryPagePreview;
