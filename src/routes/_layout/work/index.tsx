import { createFileRoute } from '@tanstack/react-router';
import { Work } from '../../../pages/Work/Work';

export const Route = createFileRoute('/_layout/work/')({
  component: Work,
});
