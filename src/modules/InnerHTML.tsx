interface InnerHTMLProps {
  details: string;
  style?: string;
}

export default function InnerHTML({ details, style }: InnerHTMLProps) {
  return (
    <div className={`rtl p-0 ${style ? style : ""} `}>
      <div
        className={`ql-editor w-full`}
        dangerouslySetInnerHTML={{ __html: details || "" }}
      />
    </div>
  );
}
