
export default function (senderId, platform) {

  if (!senderId || !platform) {
    throw new Error('You must speficy senderId and platform to build gateway id');
  }

  senderId = senderId.toUpperCase();
  platform = platform.toUpperCase();

  return `${platform}_${senderId}`;

}
