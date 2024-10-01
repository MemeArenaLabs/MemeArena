interface Metadata {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: { trait_type: string; value: string; }[];
    properties: { files: { uri: string; type: string; }[]; category: string; };
}

export const gladiators = [
  { name: 'Wificus', image: '/public/plant.jpg' },
  { name: 'Popcatius', image: '/public/plant.jpg' },
  { name: 'Bonkarus', image: '/public/plant.jpg' },
  { name: 'Giga Imperator', image: '/public/plant.jpg' },
  { name: 'Ponkarus', image: '/public/plant.jpg' },
];

export const attributes = {
  role: ['Tank', 'Rogue', 'Mage'],
  element: ['Fire', 'Water', 'Earth']
};

export const generateMetadata = () => {

    const metadataList: Metadata[] = [];

    gladiators.forEach(gladiator => {
        attributes.role.forEach(role => {
            attributes.element.forEach(element => {
                const metadata = {
                    name: `${gladiator} ${role} ${element}`,
                    description: `This is a ${gladiator} with ${role} role and ${element} element.`,
                    image: gladiator.image, // This will be set dynamically
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