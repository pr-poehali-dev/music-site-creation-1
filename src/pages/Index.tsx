import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  plays: number;
  likes: number;
  isLiked: boolean;
  downloadUrl: string;
}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Electric Dreams",
    artist: "Твой Псевдоним",
    duration: "3:42",
    plays: 1250,
    likes: 89,
    isLiked: false,
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Midnight Vibes",
    artist: "Твой Псевдоним",
    duration: "4:15",
    plays: 2100,
    likes: 156,
    isLiked: true,
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Neon Nights",
    artist: "Твой Псевдоним",
    duration: "3:28",
    plays: 875,
    likes: 67,
    isLiked: false,
    downloadUrl: "#",
  },
];

export default function Index() {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [activeSection, setActiveSection] = useState("home");

  const handleLike = (trackId: string) => {
    setTracks(
      tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              isLiked: !track.isLiked,
              likes: track.isLiked ? track.likes - 1 : track.likes + 1,
            }
          : track,
      ),
    );
  };

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Загружается файл:", file.name);
      // Здесь будет логика загрузки файла
    }
  };

  const navItems = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "music", label: "Музыка", icon: "Music" },
    { id: "about", label: "Обо мне", icon: "User" },
    { id: "contact", label: "Контакты", icon: "Mail" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <Icon name="Music" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white font-montserrat">
                MUSIC STREAMING
              </h1>
            </div>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeSection === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-20">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-montserrat">
                  Твоя Музыка
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-open-sans">
                  Загружай свои треки, делись с миром и получай обратную связь
                  от слушателей
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Загрузить трек
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Слушать
                  </Button>
                </div>
              </div>
            </section>

            {/* Upload Section */}
            <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Загрузить новый трек
                </h3>
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors">
                  <Icon
                    name="Upload"
                    size={48}
                    className="mx-auto mb-4 text-white/60"
                  />
                  <p className="text-white/80 mb-4">
                    Перетащите MP3 файл сюда или нажмите для выбора
                  </p>
                  <input
                    type="file"
                    accept=".mp3"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer">
                      Выбрать файл
                    </Button>
                  </label>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Play" size={20} className="mr-2" />
                    Прослушивания
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">4,225</div>
                  <p className="text-white/80 text-sm">+12% за месяц</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Heart" size={20} className="mr-2" />
                    Лайки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">312</div>
                  <p className="text-white/80 text-sm">+8% за месяц</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Download" size={20} className="mr-2" />
                    Скачивания
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">156</div>
                  <p className="text-white/80 text-sm">+24% за месяц</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeSection === "music" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Моя музыка</h2>

            <div className="grid gap-6">
              {tracks.map((track) => (
                <Card
                  key={track.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => handlePlay(track)}
                          className={`w-12 h-12 rounded-full ${
                            currentTrack?.id === track.id && isPlaying
                              ? "bg-gradient-to-r from-red-500 to-orange-500"
                              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                          }`}
                        >
                          <Icon
                            name={
                              currentTrack?.id === track.id && isPlaying
                                ? "Pause"
                                : "Play"
                            }
                            size={20}
                            className="text-white"
                          />
                        </Button>

                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {track.title}
                          </h3>
                          <p className="text-white/70">{track.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-white/70 text-sm">Прослушивания</p>
                          <p className="text-white font-semibold">
                            {track.plays.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => handleLike(track.id)}
                            variant="ghost"
                            className={`${track.isLiked ? "text-red-400" : "text-white/60"} hover:text-red-400`}
                          >
                            <Icon
                              name="Heart"
                              size={18}
                              className={track.isLiked ? "fill-current" : ""}
                            />
                            <span className="ml-1">{track.likes}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="text-white/60 hover:text-white"
                            onClick={() => window.open(track.downloadUrl)}
                          >
                            <Icon name="Download" size={18} />
                          </Button>
                        </div>

                        <div className="text-white/70 text-sm">
                          {track.duration}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-3xl">Обо мне</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-white/80 text-lg leading-relaxed">
                  <p className="mb-4">
                    Добро пожаловать на мою музыкальную платформу! Я независимый
                    артист, создающий электронную музыку с элементами синтвейва
                    и эмбиента.
                  </p>
                  <p className="mb-4">
                    Моя цель — создавать атмосферную музыку, которая переносит
                    слушателей в другие миры. Каждый трек — это отдельная
                    история, эмоция, переживание.
                  </p>
                  <p>
                    Здесь вы найдете все мои релизы, сможете скачать треки и
                    поддержать мое творчество лайками и репостами.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Жанры</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Synthwave", "Ambient", "Electronic", "Chillout"].map(
                        (genre) => (
                          <Badge
                            key={genre}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          >
                            {genre}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">
                      Оборудование
                    </h4>
                    <ul className="text-white/70 space-y-1">
                      <li>• Ableton Live 11</li>
                      <li>• Native Instruments Komplete</li>
                      <li>• Roland JD-Xi</li>
                      <li>• Audio-Technica ATH-M50x</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "contact" && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-3xl">Контакты</CardTitle>
                <CardDescription className="text-white/80">
                  Свяжитесь со мной для коллабораций или просто поговорить о
                  музыке
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-white/60" />
                    <span className="text-white">your.email@example.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon
                      name="MessageSquare"
                      size={20}
                      className="text-white/60"
                    />
                    <span className="text-white">@your_telegram</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Music" size={20} className="text-white/60" />
                    <span className="text-white">
                      SoundCloud: /your-profile
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-white font-semibold mb-4">
                    Отправить сообщение
                  </h4>
                  <div className="space-y-4">
                    <Input
                      placeholder="Ваше имя"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                    <textarea
                      placeholder="Ваше сообщение..."
                      className="w-full h-32 p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 resize-none"
                    />
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white w-full">
                      Отправить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Player Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/20 p-4 z-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  <Icon
                    name={isPlaying ? "Pause" : "Play"}
                    size={16}
                    className="text-white"
                  />
                </Button>

                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {currentTrack.title}
                  </h4>
                  <p className="text-white/70 text-xs">{currentTrack.artist}</p>
                </div>
              </div>

              <div className="flex-1 mx-8 max-w-md">
                <div className="flex items-center space-x-2 text-white/70 text-xs mb-1">
                  <span>1:23</span>
                  <Progress
                    value={currentTime}
                    max={duration}
                    className="flex-1"
                  />
                  <span>3:42</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} className="text-white/70" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-20"
                  />
                </div>

                <Button
                  onClick={() => handleLike(currentTrack.id)}
                  variant="ghost"
                  size="sm"
                  className={`${currentTrack.isLiked ? "text-red-400" : "text-white/60"} hover:text-red-400`}
                >
                  <Icon
                    name="Heart"
                    size={16}
                    className={currentTrack.isLiked ? "fill-current" : ""}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
