"use client";
import { useEffect, useState } from "react";

import { TeamCardModel } from "../../models/teamCardModel";
import InfoImage from "../../components/InfoImage";
import ModalPage from "../../modals/ModalPage";
import ModalLoading from "../../modals/ModalLoading";
import { getTeamInfo } from "../../services/basicDataService";
import { downloadProfilePhoto } from "../../services/userService";
import { getImageUrl } from "../../helpers/getImageUrl";

const NuestroEquipoPage = () => {
  const [team, setTeam] = useState<TeamCardModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async (cards: TeamCardModel[]) => {
    for(const td of cards){
      if (!td.image) continue;
      const base64 = await downloadProfilePhoto(td.image);
      td.imageUrl = getImageUrl(base64);
    }
    return cards;
  }

  const getData = async () => {
    const teamData = await getTeamInfo();
    const dataWithImages = await getImages(teamData);
    setTeam(dataWithImages);
    setLoading(false);
  };
  
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const TeamCard = (info: TeamCardModel, index: number) => {
    return (
      <InfoImage
        key={index}
        urlImage={info.imageUrl}
        imageTitle={info.fullName}
        reverse={index % 2 == 0}
        classNameImage="w-1/4"
      >
        <div className="p-10 w-3/4">
          <div className="text-xl">
            <h2 className="font-bold">{info.fullName}</h2>
            <h3>{info.position}</h3>
          </div>
          <p className="mt-5 mb-10">{info.description}</p>

          {(info.email || info.phone) && <p className="mb-4">Contáctate:</p>}

          <a className="underline" href={`mailto:${info.email}`}>
            {info.email}
          </a>
          <p>{info.phone}</p>
        </div>
      </InfoImage>
    );
  };
  return (
    <>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}
      <div className="p-0 bg-slate-100">
        <h1 className="m-6 text-4xl font-semibold">Conoce a nuestro equipo</h1>
        {team.map((item, index) => {
          return TeamCard(item, index);
        })}
      </div>
    </>
  );
};

export default NuestroEquipoPage;
