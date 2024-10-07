import { useMemo } from 'react';

export interface Metadata {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: { trait_type: string; value: string; }[];
    properties: { files: { uri: string; type: string; }[]; category: string; };
}

const gladiators = [
  { name: 'Wifrix', image: '/public/assets/mint/wifrix.png' },
  { name: 'Popcator', image: '/public/assets/mint/popcator.png' },
  { name: 'Bongo', image: '/public/assets/mint/bongo.png' },
  { name: 'Chadius', image: '/public/assets/mint/chadius.png'},
  { name: 'Moodenkuro', image: '/public/assets/mint/moodenkuro.png'},
];

const attributes = {
  role: ['Tank', 'Rogue', 'Fighter'],
  element: ['Fire', 'Water', 'Plant']
};

export const useGenerateMetadata = () => {
    const metadataList: Metadata[] = [];

    gladiators.forEach(gladiator => {
        attributes.role.forEach(role => {
            attributes.element.forEach(element => {
                const metadata = {
                    name: `${gladiator.name} ${role} ${element}`,
                    description: `This is a ${role} ${gladiator.name} type ${element}.`,
                    image: gladiator.image,
                    external_url: 'https://example.com',
                    attributes: [
                        { trait_type: 'Role', value: role },
                        { trait_type: 'Element', value: element }
                    ],
                    properties: {
                        files: [
                            {
                                uri: gladiator.image,
                                type: 'image/jpeg',
                            },
                        ],
                        category: 'image',
                    },
                };
                metadataList.push(metadata);
            });
        });
    });

    return metadataList;
};