package wac.dp.StructuralPatterns.Adapter;

public class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        //播放 mp3 音乐文件的内置支持
        if(audioType.equalsIgnoreCase("mp3")){
            System.out.println("Playing mp3 file. Name: "+ fileName);
        }
        //mediaAdapter 提供了播放其他文件格式的支持
        else if(audioType.equalsIgnoreCase("vlc")
                || audioType.equalsIgnoreCase("mp4")){
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        }
        else{
            System.out.println("Invalid media. "+
                    audioType + " format not supported");
        }
    }

    public static void main(String[] args) {
        AudioPlayer player = new AudioPlayer();
        player.play("mp3","music.mp3");
        player.play("vlc","hello.vlc");
        player.play("mp4","movie.mp4");
        player.play("avi","film.avi");
        player.play("mp3","music11.mp3");
    }
}
