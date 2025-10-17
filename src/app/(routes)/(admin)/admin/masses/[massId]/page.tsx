import React from "react";
import MassForm from "../_components/MassForm";
import { getMassById } from "@/servers/Mass";
import { Mass } from "@prisma/client";

const MassPage = async ({
  params,
}: {
  params: Promise<{ massId: string }>;
}) => {
  const { massId } = await params;
  const data: Mass | null = await getMassById(massId);
  return <MassForm massData={data} />;
};

export default MassPage;
