let videoPlaying = false;

export function playVideo(videoSrc, muted = true, onEnd = null) {
  if (videoPlaying) return;

  const video = document.createElement("video");
  video.src = videoSrc;
  video.autoplay = true;
  video.loop = false;
  video.style.position = "absolute";
  video.style.top = 0;
  video.style.left = 0;
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.zIndex = 9999;

  document.body.appendChild(video);
  videoPlaying = true;

  video.onended = () => {
    document.body.removeChild(video);
    videoPlaying = false;
    if (onEnd) onEnd();
  };
}
