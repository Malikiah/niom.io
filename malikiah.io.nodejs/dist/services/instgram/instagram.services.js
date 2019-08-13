"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const rs = require("request-promise");
class InstagramService {
    async getInstagramProfileBasic(resolve, pages) {
        var data = [];
        var profile;
        for await (var page of pages) {
            rs('https://www.instagram.com/' + page.instagramUsername)
                .then((body) => {
                body = JSON.parse(body.split(/window._sharedData = |;<\/script>/, 7)[1]);
                profile = {
                    'title': page.title,
                    'fullName': body.entry_data.ProfilePage[0].graphql.user.full_name,
                    'userName': body.entry_data.ProfilePage[0].graphql.user.username,
                    'profilePicture': body.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd,
                    'followers': body.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
                    'following': body.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
                };
                data.push(profile);
                if (data.length === pages.length) {
                    resolve(data);
                }
            });
        }
        /*request({ method: 'GET', url:'https://www.instagram.com/' + page.instagramUsername}, (err, res, body: any) => {
        
            body = JSON.parse(body.split(/window._sharedData = |;<\/script>/, 7)[1]);
            
            
            profile = {
                        'fullname': body.entry_data.ProfilePage[0].graphql.user.full_name,
                        'username': body.entry_data.ProfilePage[0].graphql.user.username,
                        'profile_picture': body.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd,
                        'followed': body.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
                        'following': body.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
            }
            
            data.push(profile);


            })*/
    }
    getInstagramProfile(resolve, pages) {
        console.log(pages);
        let data = [];
        pages.forEach((page) => {
            request('https://www.instagram.com/' + page.instagramUsername, (err, res, body) => {
                body = JSON.parse(body.split(/window._sharedData = |;<\/script>/, 7)[1]);
                var profile = {
                    'fullname': body.entry_data.ProfilePage[0].graphql.user.full_name,
                    'username': body.entry_data.ProfilePage[0].graphql.user.username,
                    'biography': body.entry_data.ProfilePage[0].graphql.user.biography,
                    'profile_picture': body.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd,
                    'followed': body.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
                    'following': body.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
                };
                //console.log(profile);
                data.push(profile);
                resolve(body.entry_data.ProfilePage[0].graphql.user);
            });
            console.log(data);
        });
    }
    getInstagramPosts() {
    }
}
exports.InstagramService = InstagramService;
//# sourceMappingURL=instagram.services.js.map