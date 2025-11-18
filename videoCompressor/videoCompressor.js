import ffmpegPath from "ffmpeg-static"
import Ffmpeg from "fluent-ffmpeg"
Ffmpeg.setFfmpegPath(ffmpegPath)

function videoCompressor(inputPath,outputPath,video)
{
    return new Promise((resolve, reject) => {
    Ffmpeg(inputPath)
      .outputOptions([
        "-vcodec libx264",
        "-crf 25",
        "-preset veryfast",
        "-acodec aac",
        "-b:a 128k",
        "-movflags +faststart"
      ])
      .save(outputPath)
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err));
  });

}
export default videoCompressor