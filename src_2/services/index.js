/**
 * @Description: index Service
 * @Created by ZiniTeam
 * @Date create: 12/01/2019
 */
/** SERVICES */
import Categories from './categories';
import Posts from './posts';
import Medias from './medias';
import Tags from './tags';
import Pages from './pages';
import Users from './users';
//import Pdf from './pdf'
import Settings from './settings';
import FCMToken from './fcmToken';
import Comment from './comment';
let Services = {
    Categories,
    Posts,
    Medias,
    Tags,
    Pages,
    Users,
    //Pdf,
    Settings,
    FCMToken,
    Comment
};

export default Services;