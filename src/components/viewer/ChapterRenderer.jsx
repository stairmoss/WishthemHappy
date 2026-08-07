import React from 'react';
import { ScrapbookStory } from '../../stories/ScrapbookStory';
import { MuseumStory } from '../../stories/MuseumStory';
import { MovieStory } from '../../stories/MovieStory';
import { WrappedStory } from '../../stories/WrappedStory';
import { DiaryStory } from '../../stories/DiaryStory';

export function ChapterRenderer({ story }) {
  const storyType = story?.meta?.storyType || 'SCRAPBOOK';

  switch (storyType) {
    case 'MUSEUM':
      return <MuseumStory story={story} />;
    case 'MOVIE':
      return <MovieStory story={story} />;
    case 'WRAPPED':
      return <WrappedStory story={story} />;
    case 'DIARY':
      return <DiaryStory story={story} />;
    case 'SCRAPBOOK':
    default:
      return <ScrapbookStory story={story} />;
  }
}
