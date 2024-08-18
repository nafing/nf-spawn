import { useState } from "react";
import { IconHome, IconLocationPin } from "@tabler/icons-react";
import {
  ActionIcon,
  BackgroundImage,
  Button,
  Card,
  Group,
  Image,
  Popover,
  Text,
  Transition,
} from "@mantine/core";
import {
  emitNet,
  useCharacterLocations,
  useStaticLocations,
  useToggle,
} from "@/hooks";

import { createFileRoute } from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";

export const Route = createFileRoute("/map")({
  component: Map,
});

function Map() {
  const { setOpen } = useToggle();

  const { firstApartments, defaultSpawns } = useStaticLocations();
  const { lastLocation } = useCharacterLocations();

  const [openedSelectProperty, handlerProperty] = useDisclosure();
  const [selectedProperty, setSelectedProperty] = useState<{
    apartmentName: string;
    apartmentLabel: string;
    apartmentId: number;
    location: Vector3;
  }>({
    apartmentName: "",
    apartmentLabel: "",
    apartmentId: 0,
    location: { x: 0, y: 0, z: 0 },
  });

  const [openedSelectSpawn, handlerSpawn] = useDisclosure();
  const [selectedSpawn, setSelectedSpawn] = useState<{
    label: string;
    description: string;
    location: Vector4;
  }>({
    label: "",
    description: "",
    location: { x: 0, y: 0, z: 0, w: 0 },
  });

  return (
    <BackgroundImage src="/html/map.png" h="100vh">
      {firstApartments.map((apartment, index) => (
        <Popover
          width={240}
          position="bottom"
          withArrow
          shadow="md"
          key={index}
        >
          <Popover.Target>
            <ActionIcon
              pos="absolute"
              size="sm"
              variant="transparent"
              style={{
                transform: "translate(-50%, -50%)",
                top: apartment.ui.top,
                left: apartment.ui.left,
              }}
            >
              <IconHome />
            </ActionIcon>
          </Popover.Target>

          <Popover.Dropdown>
            <Text fz="md" fw={600}>
              {apartment.label}
            </Text>

            <Text fz="xs" mb="sm">
              {apartment.description}
            </Text>

            <Group gap="xs">
              {Object.keys(apartment.interior).map((interior) => (
                <Button
                  key={apartment.interior[interior].index}
                  onClick={() => {
                    handlerProperty.open();

                    setSelectedProperty({
                      apartmentName: interior,
                      apartmentLabel: apartment.label,
                      apartmentId: apartment.interior[interior].index,
                      location: apartment.interior[interior].location,
                    });
                  }}
                >
                  Preview
                </Button>
              ))}
            </Group>
          </Popover.Dropdown>
        </Popover>
      ))}

      {defaultSpawns.map((spawn, index) => (
        <Popover
          width={240}
          position="bottom"
          withArrow
          shadow="md"
          key={index}
          onOpen={() => {
            handlerSpawn.open();

            setSelectedSpawn({
              label: spawn.label,
              description: spawn.description,
              location: spawn.location,
            });
          }}
          onClose={() => {
            handlerSpawn.close();
          }}
        >
          <Popover.Target>
            <ActionIcon
              pos="absolute"
              size="sm"
              variant="transparent"
              style={{
                transform: "translate(-50%, -50%)",
                top: spawn.ui.top,
                left: spawn.ui.left,
              }}
            >
              <IconLocationPin />
            </ActionIcon>
          </Popover.Target>

          <Popover.Dropdown>
            <Text fz="md" fw={600}>
              {spawn.label}
            </Text>

            <Text fz="xs" mb="sm">
              {spawn.description}
            </Text>

            <Button
              radius="sm"
              variant="filled"
              onClick={() => {
                emitNet({
                  eventName: "spawnAt",
                  payload: selectedSpawn.location,
                  handler: () => {
                    setOpen(false);
                  },
                });
              }}
            >
              Spawn At Location
            </Button>
          </Popover.Dropdown>
        </Popover>
      ))}

      {/* <ActionIcon
        pos="absolute"
        size="sm"
        variant="transparent"
        style={{
          transform: "translate(-50%, -50%)",
          top: "49.75%",
          left: "40%",
        }}
      >
        <IconLocationPin />
      </ActionIcon> */}

      <Transition mounted={openedSelectProperty}>
        {(styles) => (
          <Card
            w={420}
            shadow="sm"
            padding="xs"
            radius="md"
            pos="absolute"
            top={20}
            right={20}
            style={styles}
          >
            <Card.Section>
              <Image src={`/html/${selectedProperty.apartmentName}.png`} w={420} />
            </Card.Section>

            <Text fz="xl" fw={600} mt="xs">
              {selectedProperty.apartmentLabel}
            </Text>

            <Text fz="sm" mb="xs">
              {selectedProperty.apartmentName}
            </Text>

            <Button
              radius="sm"
              variant="filled"
              onClick={() => {
                emitNet({
                  eventName: "selectApartment",
                  payload: {
                    apartmentId: selectedProperty.apartmentId,
                    location: selectedProperty.location,
                  },
                  handler: () => {
                    setOpen(false);
                    handlerProperty.close();
                  },
                });
              }}
            >
              Spawn In Property
            </Button>
          </Card>
        )}
      </Transition>

      <Transition mounted={openedSelectSpawn}>
        {(styles) => (
          <Card
            w={420}
            shadow="sm"
            padding="xs"
            radius="md"
            pos="absolute"
            top={20}
            right={20}
            style={styles}
          >
            <Card.Section>
              <Image src={`/html/${selectedSpawn.label}.png`} w={420} />
            </Card.Section>

            <Text fz="xl" fw={600} mt="xs">
              {selectedSpawn.label}
            </Text>

            <Text fz="sm">{selectedSpawn.description}</Text>
          </Card>
        )}
      </Transition>

      {lastLocation && (
        <Button
          pos="absolute"
          bottom={40}
          right={20}
          size="xl"
          onClick={() => {
            emitNet({
              eventName: "spawnAt",
              payload: lastLocation,
              handler: () => {
                setOpen(false);
              },
            });
          }}
        >
          Spawn At Last Location
        </Button>
      )}
    </BackgroundImage>
  );
}
