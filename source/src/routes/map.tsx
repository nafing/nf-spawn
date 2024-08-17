import { useEffect } from "react";
import {
  IconHomeFilled,
  IconNavigationFilled,
  IconPointFilled,
} from "@tabler/icons-react";
import {
  ActionIcon,
  BackgroundImage,
  Button,
  Popover,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  emitNet,
  useApartments,
  usePlayerLocation,
  useProperties,
  useToggle,
} from "@/hooks";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/map")({
  component: Map,
});

function Map() {
  const { setOpen } = useToggle();
  const { lastLocation } = usePlayerLocation();
  const { apartments } = useApartments();
  const { properties } = useProperties();

  const sW = window.screen.width;
  const sH = window.screen.height;

  const centerCoords = [504, 792];

  const convertCoordsX = (y: number) => {
    return y + centerCoords[0];
  };

  const convertCoordsY = (x: number) => {
    return x + centerCoords[1];
  };

  return (
    <BackgroundImage
      src="./map.png"
      h="100vh"
      style={
        {
          // transform: "scale(2.8)",
        }
      }
    >
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <ActionIcon
            pos="absolute"
            size={14}
            variant="transparent"
            style={{
              transform: "translate(-50%, -50%)",
              top: convertCoordsX(0),
              left: convertCoordsY(0),
            }}
          >
            <IconNavigationFilled />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown>
          <Text size="xs">
            {lastLocation.x}, {lastLocation.y}
          </Text>
        </Popover.Dropdown>
      </Popover>

      <ActionIcon
        pos="absolute"
        size={14}
        variant="transparent"
        style={{
          opacity: 0.5,
          transform: "translate(-50%, -50%)",
          top: 504,
          left: 792,
        }}
      >
        <IconNavigationFilled />
      </ActionIcon>

      {/* {apartments.map((apartment) => (
        <Tooltip
          key={apartment.id}
          label={apartment.label}
          position="top"
          withArrow
        >
          <ActionIcon
            pos="absolute"
            size={10}
            variant="transparent"
            style={{
              transform: "translate(-50%, -50%)",
              top: convertCoordsTop(apartment.enter.x),
              left: convertCoordsLeft(apartment.enter.y),
            }}
          >
            <IconHomeFilled />
          </ActionIcon>
        </Tooltip>
      ))}

      {properties.map((property) => (
        <Tooltip
          key={property.id}
          label={property.label}
          position="top"
          withArrow
        >
          <ActionIcon
            pos="absolute"
            size={10}
            variant="transparent"
            style={{
              transform: "translate(-50%, -50%)",
              top: convertCoordsTop(property.enter.x),
              left: convertCoordsLeft(property.enter.y),
            }}
          >
            <IconPointFilled />
          </ActionIcon>
        </Tooltip>
      ))} */}
    </BackgroundImage>
  );
}
