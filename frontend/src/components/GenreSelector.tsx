import { createStyles, SegmentedControl, rem } from '@mantine/core';
import { send } from 'process';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
      }`,
  },

  indicator: {
    backgroundImage: theme.fn.gradient({ from: 'violet', to: 'grape' }),
  },

  control: {
    border: '0 !important',
  },

  label: {
    '&, &:hover': {
      '&[data-active]': {
        color: theme.white,
      },
    },
  },
}));

const GenreSelector = ({setGenreOnPage}) => {
  const { classes } = useStyles();
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Action", "Comedy", "Documentary", "Drama",
      "Fantasy", "Horror", "Science Fiction", "Thriller"]}
      classNames={classes}
      color="violet"
      onChange={(value) => setGenreOnPage(value)}
    />
  );
}
export default GenreSelector;