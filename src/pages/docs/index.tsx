import {
  getContentBySlug,
  getDocsNavigation,
} from "@/utils/content/content-helpers";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import DocsLayout from "@/components/docs/docs-layout";
import ContentMeta from "@/components/content-pages/content-meta";

const DocsShow = ({ navigation, content, title, meta }) => {
  return (
    <DocsLayout navigation={navigation}>
      <ContentMeta
        title={title}
        description={meta.description}
        socialDescription={meta.socialDescription}
        socialImage={meta.socialImage}
      />
      <div className="prose mx-auto">
        <h1 className="mt-0 pt-0">{title}</h1>
        <MDXRemote {...content} />
      </div>
    </DocsLayout>
  );
};

export default DocsShow;

export async function getStaticProps({ params, locale, ...rest }) {
  const doc = await getContentBySlug("index", {
    locale,
    contentType: "docs",
  });

  const navigation = await getDocsNavigation(locale);

  const content = await serialize(doc.content);
  return {
    props: {
      ...doc,
      navigation,
      content,
    },
  };
}