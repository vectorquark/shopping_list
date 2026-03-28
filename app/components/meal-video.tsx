import React from "react";

type MealVideoProps = {
  youtubeUrl: string | null;
  title: string;
};

function getYoutubeEmbedUrl(youtubeUrl: string): string | null {
  try {
    const parsedUrl = new URL(youtubeUrl);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const idFromPath = parsedUrl.pathname.replace("/", "").trim();
      return idFromPath ? `https://www.youtube.com/embed/${idFromPath}` : null;
    }

    const videoId = parsedUrl.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const embedId = pathParts[pathParts.length - 1];
    return embedId ? `https://www.youtube.com/embed/${embedId}` : null;
  } catch {
    return null;
  }
}

export default function MealVideo({ youtubeUrl, title }: MealVideoProps) {
  if (!youtubeUrl) {
    return null;
  }

  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);
  if (!embedUrl) {
    return null;
  }

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 bg-black">
      <div className="aspect-video w-full">
        <iframe
          title={`${title} video`}
          src={embedUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
