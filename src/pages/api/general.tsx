/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';

import { deploymentURL } from '@/constant/env';

export const inter400 = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const inter700 = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const interRegular = await inter400;
  const interBold = await inter700;

  const { searchParams } = new URL(req.url);

  const name = searchParams.get('name');
  const image = searchParams.get('image');
  const theme = searchParams.get('theme');
  const logo = searchParams.get('logo');
  const templateTitle = searchParams.get('templateTitle');
  const logoWidth = searchParams.get('logoWidth');
  const logoHeight = searchParams.get('logoHeight');

  const query = {
    name: name ?? 'Site Name',
    image: image ?? `${deploymentURL}/images/doodle.png`,
    theme: theme ?? 'dark',
    logo: logo ?? `${deploymentURL}/images/card.png`,
    templateTitle,
    logoWidth: logoWidth ? +logoWidth : 100,
    logoHeight: logoHeight ? +logoHeight : undefined,
  };

  const getImage = () => {
    function randomIntFromInterval(min: number, max: number) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const nonce = randomIntFromInterval(0, 5);
    switch (nonce) {
      case 0:
        return {
          path: `${deploymentURL}/images/card_1.png`,
          nameColor: '#ffffff',
        };
      case 1:
        return {
          path: `${deploymentURL}/images/card_2.png`,
          nameColor: '#ffffff',
        };
      case 2:
        return {
          path: `${deploymentURL}/images/card_3.png`,
          nameColor: '#000000',
        };
      case 3:
        return {
          path: `${deploymentURL}/images/card_4.png`,
          nameColor: '#ffffff',
        };
      case 4:
        return {
          path: `${deploymentURL}/images/card_5.png`,
          nameColor: '#ffffff',
        };
      default:
        return {
          path: `${deploymentURL}/images/card_1.png`,
          nameColor: '#ffffff',
        };
    }
  };
  const card = getImage();

  return new ImageResponse(
    (
      <div
        style={{
          height: '1080px',
          width: '1080px',
          fontFamily: 'Inter',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: clsx(query.theme === 'dark' ? '#222' : '#fff'),
        }}
      >
        <img
          style={{ width: '1080px', height: '1080px' }}
          src={card.path}
          alt='Favicon'
        >
          <h1
            style={{
              position: 'absolute',
              bottom: '365px',
              left: '172px',
              fontSize: '30px',
              color: card.nameColor,
            }}
          >
            {query.name}
          </h1>
          <img
            style={{
              position: 'absolute',
              bottom: '425px',
              left: '172px',
              width: '103px',
              height: '103px',
              borderRadius: 15,
            }}
            alt={`${deploymentURL}/images/doodle.png`}
            src={query.image}
          />
        </img>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
        },
      ],
    }
  );
}
