import RNFS from 'react-native-fs';

/**
 * Downloads a video and stores it inside the app cache directory
 * 
 * @param url - Video file URL
 * @param filename - Filename to save
 */
export const downloadVideo = async (url: string, filename: string): Promise<string | null> => {
  try {
    const destPath = `${RNFS.CachesDirectoryPath}/${filename}`;

    console.log('[downloadVideo] Starting download:', url);
    console.log('[downloadVideo] Destination:', destPath);

    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: destPath,
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`[downloadVideo] Progress: ${progress.toFixed(2)}%`);
      },
    }).promise;

    console.log('[downloadVideo] Download result:', result);

    if (result.statusCode === 200) {
      console.log('[downloadVideo] Success. File saved at:', destPath);
      return destPath;
    } else {
      console.error('[downloadVideo] Failed with status code:', result.statusCode);
      return null;
    }
  } catch (error) {
    console.error('[downloadVideo] Error:', error);
    return null;
  }
};
