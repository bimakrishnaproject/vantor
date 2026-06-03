const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/assets/improve_hero.mp4');
const outputDir = path.join(__dirname, '../public/assets/frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clear old frames if any
const files = fs.readdirSync(outputDir);
for (const file of files) {
  fs.unlinkSync(path.join(outputDir, file));
}

ffmpeg.setFfmpegPath(ffmpegPath);

console.log('Extracting frames from', inputPath);

ffmpeg(inputPath)
  .outputOptions([
    '-vf fps=12,scale=1280:-1', // 12 frames per sec, 720p equivalent
    '-q:v 3' // decent quality jpeg
  ])
  .output(path.join(outputDir, 'frame_%04d.jpg'))
  .on('end', () => {
    const extracted = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg'));
    console.log(`Successfully extracted ${extracted.length} frames.`);
  })
  .on('error', (err) => {
    console.error('Error extracting frames:', err);
  })
  .run();
