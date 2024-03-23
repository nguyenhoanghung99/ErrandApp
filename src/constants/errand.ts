import {IconName} from '../components/@shared/MyIcons';
import {Transportation} from '../types/errand';

export const TRANSPORTATION_LIST: {
  id: Transportation;
  name: string;
  iconName: IconName;
}[] = [
  {
    id: 'walk',
    name: 'onFoot',
    iconName: 'run',
  },
  {
    id: 'bike',
    name: 'motorbike',
    iconName: 'bike',
  },
  {
    id: 'car',
    name: 'car',
    iconName: 'car',
  },
];

export const REVIEW_ITEMS = [
  {key: 'quickRespond'},
  {key: 'quickProcessed'},
  {key: 'friendly'},
  {key: 'reasonable'},
  {key: 'otherReasons'},
];
