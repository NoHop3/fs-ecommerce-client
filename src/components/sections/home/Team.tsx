import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  MantineProvider,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export function UserCardImage({
  image,
  avatar,
  name,
  job,
  stats,
}: UserCardImageProps) {
  const { classes } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align='center' size='lg' weight={500}>
        {stat.value}
      </Text>
      <Text align='center' size='sm' color='dimmed'>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p='xl' radius='md' className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx='auto'
        mt={-30}
        className={classes.avatar}
      />
      <Text align='center' size='lg' weight={500} mt='sm'>
        {name}
      </Text>
      <Text align='center' size='sm' color='dimmed'>
        {job}
      </Text>
      <Group mt='md' position='center' spacing={30}>
        {items}
      </Group>
    </Card>
  );
}

export const Team = ({ theme }: { theme: string }) => {
  return (
    <MantineProvider
      theme={{ colorScheme: theme === "wapper true" ? "dark" : "light" }}>
      <div className='team'>
        <h3 className='team--title'>Our valuable team</h3>
        <div className='team__wrapper'>
          <UserCardImage
            image={
              "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            }
            job={"Developer"}
            stats={[
              { label: "Years of experience", value: "2" },
              { label: "Projects worked on", value: "12" },
            ]}
            avatar={
              "https://e7.pngegg.com/pngimages/272/184/png-clipart-businessperson-avatar-woman-business-avatar-microphone-black-hair.png"
            }
            name={"Katerine P."}
          />
          <UserCardImage
            image={
              "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            }
            job={"HR Lead"}
            stats={[
              { label: "Years of experience", value: "5" },
              { label: "Valuable collegues hired", value: "256" },
            ]}
            avatar={
              "https://thumbs.dreamstime.com/z/face-expression-handsome-man-cheerful-male-emotion-young-guy-cartoon-character-vector-illustration-isolated-white-background-166318451.jpg"
            }
            name={"Alexandru I."}
          />
          <UserCardImage
            image={
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            }
            job={"Senior Sales Manager"}
            stats={[
              { label: "Years of experience", value: "7" },
              { label: "Customers reached", value: "224" },
            ]}
            avatar={
              "https://previews.123rf.com/images/vectorkif/vectorkif1707/vectorkif170700030/81502357-face-expression-of-a-man-neutral-calm-male-emotions-handsome-cartoon-character-vector-illustration-i.jpg"
            }
            name={"Florin P."}
          />
        </div>
      </div>
    </MantineProvider>
  );
};
