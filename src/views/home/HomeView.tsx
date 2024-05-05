import HomePageButton from "../../components/buttons/HomePageButton";

export default function HomeView() {
    return <div className="w-3/4 py-4 mx-auto flex flex-col gap-4">
        <HomePageButton caption="Gallery" href="/gallery" />
        <HomePageButton caption="Upload" href="/gallery/upload/multi" />
    </div>
}