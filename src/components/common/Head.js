import { Helmet } from "react-helmet-async";

const MAIN_KEYWORDS = "Bergen, Ulriksbanen, accommodation, hotel, guesthouse, bed&breakfast";
const DEFAULT_TITLE = "Holidaze";
const DEFAULT_DESCRIPTION = "Holidaze is where you will find your next place to stay when visiting Bergen";
const POSTFIX_TITLE = " | Holidaze";

const Head = ({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, keywords, children, addPostfixTitle, noIndex }) => {
  let metaTitle;

  if (addPostfixTitle) {
    metaTitle = title + POSTFIX_TITLE;
  } else {
    metaTitle = title;
  }

  const metaDesc = description;
  const metaKeywords = keywords.length > 0 ? MAIN_KEYWORDS + ", " + keywords : MAIN_KEYWORDS;

  const metaRobots = noIndex ? "noindex,nofollow" : "index,follow";
  return (
    <Helmet>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />

      {children}
    </Helmet>
  );
};

export default Head;
