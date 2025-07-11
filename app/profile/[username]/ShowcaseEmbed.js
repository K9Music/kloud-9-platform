'use client';
import React from 'react';

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function getSpotifyEmbedUrl(url) {
  // Accepts track, album, playlist, etc.
  const match = url.match(/spotify\.com\/(track|album|playlist|artist)\/([\w]+)/);
  if (!match) return null;
  return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
}

function getSoundCloudEmbedUrl(url) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
}

function getTikTokId(url) {
  // Accepts tiktok.com/@user/video/ID
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  return match ? match[1] : null;
}

function getVimeoId(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function getSpotifyType(url) {
  const match = url.match(/spotify\.com\/(track|album|playlist|artist)\//);
  return match ? match[1] : null;
}

export default function ShowcaseEmbed({ platform, link }) {
  // Responsive aspect ratios and heights
  if (platform === 'youtube') {
    const id = getYouTubeId(link);
    if (id) {
      return (
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      );
    }
  }
  if (platform === 'spotify') {
    const embedUrl = getSpotifyEmbedUrl(link);
    const type = getSpotifyType(link);
    if (embedUrl) {
      if (type === 'album' || type === 'playlist' || type === 'artist') {
        // Use a taller embed for album/playlist/artist, but truncate at 380px, responsive for mobile
        return (
          <div className="w-full" style={{ minHeight: 200, height: '40vw', maxHeight: 380 }}>
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="encrypted-media"
              title={`Spotify ${type}`}
              className="rounded-lg"
            />
          </div>
        );
      }
      // Track: compact
      return (
        <div className="w-full" style={{ minHeight: 80, height: 80 }}>
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            title="Spotify track"
            className="rounded-lg"
          />
        </div>
      );
    }
  }
  if (platform === 'soundcloud') {
    const embedUrl = getSoundCloudEmbedUrl(link);
    return (
      <div className="w-full" style={{ minHeight: 100, height: '30vw', maxHeight: 166 }}>
        <iframe
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={embedUrl}
          title="SoundCloud player"
          className="rounded-lg"
        />
      </div>
    );
  }
  if (platform === 'tiktok') {
    const id = getTikTokId(link);
    if (id) {
      return (
        <div className="w-full" style={{ minHeight: 200, height: '60vw', maxHeight: 600 }}>
          <iframe
            src={`https://www.tiktok.com/embed/v2/${id}`}
            width="100%"
            height="100%"
            allowFullScreen
            title="TikTok video"
            className="rounded-lg border-0"
          />
        </div>
      );
    }
  }
  if (platform === 'vimeo') {
    const id = getVimeoId(link);
    if (id) {
      return (
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://player.vimeo.com/video/${id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vimeo video"
            className="w-full h-full border-0"
          />
        </div>
      );
    }
  }
  // Fallback: styled link
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full bg-gray-700 rounded-lg flex items-center justify-center text-orange-200 hover:text-orange-100 text-sm p-2 text-center"
    >
      {link}
    </a>
  );
} 