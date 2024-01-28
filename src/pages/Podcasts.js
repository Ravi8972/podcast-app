import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastsSlice";
import PodcastCard from "../components/Podcast/PodcastCard";
import InputComponent from "../components/common/Input";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsCast } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import { BiSolidArrowFromTop, BiSolidArrowToTop } from "react-icons/bi";
import SmallCard from "../components/Podcast/SmallCard";
import MediumCard from "../components/Podcast/MediumCard";
import Loader from "../components/common/Loader";
import AudioPlayer from "../components/Podcast/AudioPlayer";

function Podcasts() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  
  const [playingFile, setPlayingFile] = useState("");
  const [toggle, setToggle] = useState(true);
  const dummydata =[

    
      {
          "subject": "Si No Estás - Iñigo Quintero",
          "text": "Si No Estás by Iñigo Quintero",
          "href": "https://www.shazam.com/track/633367735/si-no-est%C3%A1s",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c4/b2/f2/c4b2f2ae-5122-d699-2191-d6b438ed199f/cover.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Si No Estás by Iñigo Quintero.",
          "html": "https://www.shazam.com/snippets/email-share/633367735?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/c7/6e/49/c76e49ea-cafd-13e5-7fbd-1ee2e9fe8a63/48a115d8-5378-4dc9-b5a3-7e4eb08169cc_file_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/633367735"
      },
      {
          "subject": "greedy - Tate McRae",
          "text": "greedy by Tate McRae",
          "href": "https://www.shazam.com/track/675031499/greedy",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/07/92/23079247-25be-3098-ef53-78e7d0fe7406/196871341653.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover greedy by Tate McRae.",
          "html": "https://www.shazam.com/snippets/email-share/675031499?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/29/18/b6/2918b602-4505-0632-73cf-5226f9581a87/fda79ffd-5fd1-40b3-8bd7-e8ea5531dff7_ami-identity-11b6c33ddb521791b7ba1dd8c4dcf764-2023-09-15T05-27-44.467Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/675031499"
      },
      {
          "subject": "Paint The Town Red - Doja Cat",
          "text": "Paint The Town Red by Doja Cat",
          "href": "https://www.shazam.com/track/673557639/paint-the-town-red",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/97/c7/f2/97c7f256-6db0-a45b-a786-f58dc928c970/196871404495.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Paint The Town Red by Doja Cat.",
          "html": "https://www.shazam.com/snippets/email-share/673557639?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/54/ba/99/54ba9945-5aae-bec7-a80c-188de630b37b/d62857dc-e8bd-41f6-b4d5-e368875c6044_ami-identity-7d4c30a95a90f129a834aecd444aa07a-2023-06-16T14-02-41.627Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/673557639"
      },
      {
          "subject": "Water - Tyla",
          "text": "Water by Tyla",
          "href": "https://www.shazam.com/track/673104339/water",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1e/c9/5b/1ec95bbc-a56f-cbef-070c-ddec9f4fdd3c/196871296205.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Water by Tyla.",
          "html": "https://www.shazam.com/snippets/email-share/673104339?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/29/46/66/294666e7-cce0-ede3-fb48-cdf2999c96da/0e948386-5d27-46db-ab40-8b545db0ed38_ami-identity-a66d9229f871152b4ff92342246646ef-2023-07-27T20-30-43.526Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/673104339"
      },
      {
          "subject": "Strangers - Kenya Grace",
          "text": "Strangers by Kenya Grace",
          "href": "https://www.shazam.com/track/675132421/strangers",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/71/a0/15/71a0158a-3008-2ef0-f34b-b6a615aa43e4/5059460244535.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Strangers by Kenya Grace.",
          "html": "https://www.shazam.com/snippets/email-share/675132421?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/12/88/5a/12885a75-f1bc-e71d-bbd6-b357d5f2e6b4/31f61f5b-94ac-48ab-8ea9-4c2c7fc75369_ami-identity-9071226a01f789ae6bfa56e1c87e1a22-2023-04-26T13-25-58.614Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/675132421"
      },
      {
          "subject": "Vois sur ton chemin (Techno Mix) - BENNETT",
          "text": "Vois sur ton chemin (Techno Mix) by BENNETT",
          "href": "https://www.shazam.com/track/673554337/vois-sur-ton-chemin-techno-mix",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/92/68/cc/9268cc08-e44e-16f5-5682-e769e3d97f9f/5054197770722.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Vois sur ton chemin (Techno Mix) by BENNETT.",
          "html": "https://www.shazam.com/snippets/email-share/673554337?lang=en-US&country=US",
          "snapchat": "https://www.shazam.com/partner/sc/track/673554337"
      },
      {
          "subject": "(It Goes Like) Nanana (Edit) - Peggy Gou",
          "text": "(It Goes Like) Nanana (Edit) by Peggy Gou",
          "href": "https://www.shazam.com/track/667312288/it-goes-like-nanana-edit",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a7/a7/96/a7a79669-7b20-9026-cb8e-773b1a9d31e3/191404137420.png/400x400cc.jpg",
          "twitter": "I used @Shazam to discover (It Goes Like) Nanana (Edit) by Peggy Gou.",
          "html": "https://www.shazam.com/snippets/email-share/667312288?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/3a/de/39/3ade39e8-6de7-ee82-9c02-b9da415205b5/70ea60b1-f26f-4c7d-baa1-c7f969418a03_ami-identity-31a954c200a5c5c449bf5faedb6bd2b7-2023-06-16T08-51-47.675Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/667312288"
      },
      {
          "subject": "9mm - Memphis Cult, Groove Dealers & SPLYXER",
          "text": "9mm by Memphis Cult, Groove Dealers & SPLYXER",
          "href": "https://www.shazam.com/track/654260496/9mm",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/98/e8/0f/98e80ffa-18c2-6798-8b24-cfe5a483bb9e/4680961424396.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover 9mm by Memphis Cult, Groove Dealers & SPLYXER.",
          "html": "https://www.shazam.com/snippets/email-share/654260496?lang=en-US&country=US",
          "snapchat": "https://www.shazam.com/partner/sc/track/654260496"
      },
      {
          "subject": "MONACO - Bad Bunny",
          "text": "MONACO by Bad Bunny",
          "href": "https://www.shazam.com/track/680060604/monaco",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/13/21/22/132122a1-2ef2-381b-94b6-7b9449dcaa4a/197190137897.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover MONACO by Bad Bunny.",
          "html": "https://www.shazam.com/snippets/email-share/680060604?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/1a/ac/74/1aac745b-0bce-18c5-d4ac-07dbf6192fee/5c71ee0e-11e3-42d8-b1f7-0bf850252dd9_ami-identity-b99c43259683c42629e6b3a66d65af95-2023-09-25T13-13-11.585Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/680060604"
      },
      {
          "subject": "Daylight - David Kushner",
          "text": "Daylight by David Kushner",
          "href": "https://www.shazam.com/track/659236090/daylight",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/29/b8/41/29b84156-2edb-692d-329b-8faf1d076054/23SYMIM06332.rgb.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Daylight by David Kushner.",
          "html": "https://www.shazam.com/snippets/email-share/659236090?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/71/b7/eb/71b7ebc4-537e-4122-5d91-13d0f77dc2b6/d423d5cb-b6e0-4462-9edb-dac6ee2a63c6_file_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/659236090"
      },
      {
          "subject": "Tattoo - Loreen",
          "text": "Tattoo by Loreen",
          "href": "https://www.shazam.com/track/653369691/tattoo",
          "image": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/50/32/fd/5032fddc-e486-956d-a503-7ec6d17af848/22UM1IM46463.rgb.jpg/400x400cc.jpg",
          "twitter": "I used @Shazam to discover Tattoo by Loreen.",
          "html": "https://www.shazam.com/snippets/email-share/653369691?lang=en-US&country=US",
          "avatar": "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/c0/56/8e/c0568e8e-2880-5ecb-23e8-3c802ea24221/f2f9b0f7-de4f-4047-b1bb-5b7b9292b887_ami-identity-ebd31eb1e543e630fcd5a70d51ee8e60-2023-10-14T13-43-37.670Z_cropped.png/800x800cc.jpg",
          "snapchat": "https://www.shazam.com/partner/sc/track/653369691"
      }
  
  

];

const [spotify, setSpotify] = useState(dummydata);

  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
        setFilteredPodcasts(podcastsData);
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    const spotifysearch = async () => {
      const url =
        "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b6f9d03f5amshe296d181057a235p11f403jsne2d1f8b9e292",
          "X-RapidAPI-Host": "shazam.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const playlist = [];
        let count = 0;
        console.log("typeof result", typeof result);
        console.log("result", result);

        result.tracks.forEach((item) => {
          if (count > 10) {
            return;
          }
          playlist.push(item.share);
          count++;
        });
        console.log("playlist", playlist);
        setSpotify(playlist);
      } catch (error) {
       setSpotify(dummydata)
        console.error(error);
      }
    };
    spotifysearch();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = podcasts.filter((item) =>
      item.title.trim().toLowerCase().includes(text.trim().toLowerCase())
    );
    setFilteredPodcasts(filteredData);
  };

  const handleFilter = (value) => {
    setGenre(value);
    if (value !== "all") {
      const filteredData = podcasts.filter(
        (item) => item.genre?.toLowerCase() === value.toLowerCase()
      );
      setFilteredPodcasts(filteredData);
    } else {
      setFilteredPodcasts(podcasts);
    }
  };

  return (
    <div className="discover-sidebar-flex">
      <div className="input-wrapper-podcast" style={{ marginTop: "1rem" }}>
        <div className="discover-header">
          <div>
            <h1>Discover Podcasts</h1>
          </div>
          <div className="discover-icons">
            <BiDotsHorizontalRounded />
            <BsCast />
            <GoLinkExternal />
          </div>
        </div>
        <InputComponent
          state={search}
          setState={handleSearch}
          placeholder="Search by Title"
          type="text"
          className={"podcast-search-bar"}
        />
        <div className="genre-filter" style={{}}>
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => {
              handleFilter(e.target.value);
            }}
            className="custom-input-filter"
            style={{ width: "100%", height: "100%" }}
          >
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="finance">Finance</option>
            <option value="personal">Personal</option>
            <option value="others">Others</option>
            <option value="all">Genre - All</option>
          </select>
        </div>
        {filteredPodcasts.length > 0 ? (
          <>
            <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
              {filteredPodcasts.map((data, i) => {
                return (
                  <PodcastCard
                    key={i}
                    title={data.title}
                    id={data.id}
                    displayImage={data.displayImage}
                  />
                );
              })}
            </div>
          </>
        ) : search ? (
          <p>No podcasts found</p>
        ) : (
          <p>No podcasts on platform</p>
        )}

        {spotify && (
          <>
            <h2 className="spotifyHeading">Current Top Charts of the week</h2>
            <div
              className="podcasts-flex-medium"
              style={{ marginTop: "1.5rem" }}
            >
              {console.log(spotify)}
              {spotify.map((data, i) => {
                return (
                  <MediumCard
                    key={i}
                    title={data.subject}
                    id={data.snapchat}
                    displayImage={data.image}
                  />
                );
              })}
            </div>
          </>
        )}
        <div style={{height:"100px"}}/>
      </div>
      
      <div
        className={`sidebar hideInMobile ${
          toggle ? "toggle-out" : "toggle-in"
        }`}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h5
            style={{
              marginTop: "15px",
              color: "grey",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Trending now
          </h5>
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? <BiSolidArrowToTop /> : <BiSolidArrowFromTop />}
          </div>
        </div>
        <div
          className="podcasts-flex-sidebar"
          style={{
            marginTop: "1.5rem",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {spotify ? (
            spotify.map((data, i) => {
              return (
                <SmallCard
                  key={i}
                  title={data.subject}
                  id={data.snapchat}
                  displayImage={data.image}
                  src = {data.url}
                  onClick={(state) => setPlayingFile(state)}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
     

      {playingFile && (
        <AudioPlayer audioSrc={"/audiosample.mp3"} image={"/audioImage.jpg"} />
      )}
    </div>
  );
}

export default Podcasts;