import { greeting } from './greeting.js';
import { getAppName } from './config/index.js';
import { Card } from './components/Card/index.js';

const appName = getAppName();

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
].map((label, index) => ({
  label,
  value: index + 1,
}));

const description = [
  'Lorem ipsum dolor sit amet, supra mutationem signate.',
  'Nunc porta pulvinar lorem, a molestie elit vulputate nec.',
  'Maecenas vulputate fringilla mi, a posuere arcu tempor sit amet.',
  'Etiam porta nisi ut molestie hendrerit.',
  'Aenean luctus nibh vel sapien interdum, sit amet cursus nunc aliquam.',
  'Quisque rhoncus elementum sodales.',
  'Fusce placerat eros ut gravida rhoncus.',
  'Fusce pharetra, leo vitae dapibus faucibus, dolor nisl placerat elit, eget dignissim odio tortor in dolor.',
].join(' ');

export const App = () => (
  <>
    <h1>{greeting(appName)}</h1>
    <Card title="Card" description={description} options={options} />
  </>
);
