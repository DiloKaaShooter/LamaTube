import { createError } from '../error.js';
import Video from '../models/Video.js';
import User from '../models/User.js';

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({userId: req.user.id, ...req.body});
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "video not found"));

        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {new:true},
            )
            res.status(200).json(updatedVideo);
        }else{
            next(createError(403, "You can update only your video!"));
        }   
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "video not found"));

        if(req.user.id === video.userId){
                await Video.findByIdAndDelete(
                req.params.id,
                {new:true},
            )
            res.status(200).json("The video has been deleted!");
        }else{
            next(createError(403, "You can delete only your video!"));
        }   
    } catch (err) {
        next(err);
    }

}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}
export const addView = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views:1}
        },);
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
}
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{$sample: {size:40} }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const trends = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find( {userId : channelId})
            }));
        res.status(200).json(list.flat().sort((a,b)=>{return b.createdAt - a.createdAt}));
    } catch (err) {
        next(err);
    }
}

export const getByTags = async (req, res, next) => {

    const tags = req.query.tags.split(",");
    // console.log(tags);
    try {
        const videos = await Video.find({tags: {$in:tags}});
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const search = async (req, res, next) => {

    const query = req.query.q;
    // console.log(query);
    try {
        const videos = await Video.find({
            title: {$regex: query, $options: "i"},
        });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
