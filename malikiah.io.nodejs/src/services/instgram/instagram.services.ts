import * as request from 'request';

import * as rs from 'request-promise';

export class InstagramService {
    
    
    async getInstagramProfileBasic(resolve: any, pages?: any) {
        
        var data: any = [];
        var profile: any;
       
        for await (var page of pages) {
            rs('https://www.instagram.com/' + page.instagramUsername)
            .then(
                (body: any) => { 
                    body = JSON.parse(body.split(/window._sharedData = |;<\/script>/, 7)[1]);
                    
                    
                    profile = {
                                'title': page.title,
                                'fullName': body.entry_data.ProfilePage[0].graphql.user.full_name,
                                'userName': body.entry_data.ProfilePage[0].graphql.user.username,
                                'profilePicture': body.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd,
                                'followers': body.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
                                'following': body.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
                    }
                    data.push(profile);
                    if(data.length === pages.length) {
                        resolve(data);
                    }
                 }
            )
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
 
    

    getInstagramProfile(resolve: any, pages?: any) {
        console.log(pages);
        let data: any = [];
        pages.forEach((page: any) => {

        
            request('https://www.instagram.com/' + page.instagramUsername, (err, res, body: any) => {
                        
                body = JSON.parse(body.split(/window._sharedData = |;<\/script>/, 7)[1]);
                
                
                var profile:any = {
                            'fullname': body.entry_data.ProfilePage[0].graphql.user.full_name,
                            'username': body.entry_data.ProfilePage[0].graphql.user.username,
                            'biography': body.entry_data.ProfilePage[0].graphql.user.biography,
                            'profile_picture': body.entry_data.ProfilePage[0].graphql.user.profile_pic_url_hd,
                            'followed': body.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count,
                            'following': body.entry_data.ProfilePage[0].graphql.user.edge_follow.count,
                }
                //console.log(profile);
                data.push(profile);
                
                resolve(body.entry_data.ProfilePage[0].graphql.user);
                
                })
                console.log(data)
            })
                 
    }

    getInstagramPosts() {
        
    }
} 