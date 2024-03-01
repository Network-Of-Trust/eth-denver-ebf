import axios from "axios";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const { address, community, signature, nonce } = await req.json();

  const data = await submitPassport(address, community, signature, nonce);

  return Response.json(data);
}

async function submitPassport(address, community, signature, nonce) {
  const axiosSubmitPassportConfig = {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_SCORER_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const axiosSubmitPassportData = {
    address,
    community,
    signature,
    nonce,
  };

  const { data } = await axios.post(
    "https://api.scorer.gitcoin.co/registry/submit-passport",
    axiosSubmitPassportData,
    axiosSubmitPassportConfig,
  );

  return data;
}