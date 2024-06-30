import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProviders';
import usePostId from '../Hooks/usePostId';
import {
    FacebookIcon,
    FacebookShareButton,
    FacebookShareCount,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon
} from 'react-share';
import Swal from 'sweetalert2';

const PostCart = () => {
    const [post, setPost] = useState([]);
    const [commentsToShow, setCommentsToShow] = useState(4);
    const [feedbackStates, setFeedbackStates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [selectedFeedback, setSelectedFeedback] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    
    useEffect(() => {
        axiosPublic.get(`/posts/${id}`)
            .then(res => {
                setPost(res.data);
            });
    }, [id]);

    const { postTitle, description, tags, photoURL, displayName, email, upVote, downVote, timestamp } = post || {};
    const [postData, isLoading, error] = usePostId(id);
    const shareUrl = `https://your-public-url.com/posts/${id}`; // Use your actual public URL
    const title = postTitle;

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const year = date.getFullYear();

    const upvoteMutation = useMutation({
        mutationFn: () => axiosPublic.put(`/posts/upvote/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });

    const downvoteMutation = useMutation({
        mutationFn: () => axiosPublic.put(`/posts/downvote/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });

    const commentMutation = useMutation({
        mutationFn: (newComment) => axiosPublic.post(`/posts/comment/${id}`, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });

    const reportMutation = useMutation({
        mutationFn: (report) => axiosPublic.post(`/report`, report),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
        }
    });

    const handleUpvote = () => {
        upvoteMutation.mutate();
    };

    const handleDownvote = () => {
        downvoteMutation.mutate();
    };

    const handleComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const newComment = {
            name: user?.displayName,
            email: user?.email,
            comment: comment,
        };
        commentMutation.mutate(newComment);
        e.target.comment.value = '';
    };

    const handleShowMore = () => {
        setCommentsToShow(postData.comments.length);
    };

    const handleShowLess = () => {
        setCommentsToShow(4);
    };

    const handleFeedbackChange = (e, index) => {
        const value = e.target.value;
        setFeedbackStates(prevStates => ({
            ...prevStates,
            [index]: {
                selectedFeedback: value,
                isReportDisabled: !value // Update disabled state based on value
            }
        }));
    };

    const handleReportButtonClick = (index) => {
        setSelectedCommentId(index);
        setSelectedFeedback(feedbackStates[index].selectedFeedback);
        setIsModalOpen(true);
    };

    const buttonControl = async (e) => {
        e.preventDefault();
        const reportDescription = e.target.reportDescription.value;
        const name = user?.displayName;
        const info = { name, reportDescription };
        await axiosPublic.post('/report', info)
            .then(res => {
                e.target.reportDescription.value="";
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Report Submitted Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
            });
    };

    const handleReadMoreClick = (index) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading post</div>;

    return (
        <div className='p-8'>
            <div className='w-full pt-20'>
                <h1 className='text-2xl text-orange-400'>Title: {postTitle}</h1>
                <div className='w-full'>
                    <div>
                        <img src={photoURL} className='w-20 h-20 rounded-full' alt="" />
                        <p className='pb-3 pt-1'>{displayName}</p>
                        <p>{description}</p>
                        <p>Tags: {tags?.map(a => <span key={a._id}>{a.tag}</span>)}</p>
                        <p>Post time: {day}-{month}-{year}</p>
                    </div>
                </div>
            </div>
            <div className='pt-2 flex gap-2'>
                <button onClick={handleUpvote} className="btn">
                    <i className="fa-solid fa-thumbs-up text-xl"></i>
                    <div className="badge">{postData.upVote}</div>
                </button>
                <button onClick={handleDownvote} className="btn">
                    <i className="fa-solid fa-thumbs-down text-xl"></i>
                    <div className="badge">{postData.downVote}</div>
                </button>
            </div>
            <div className='md:flex '>
                <div className='my-2'>
                    <form onSubmit={handleComment}>
                        <div>
                            <input className='border-orange-500 border-2 py-3 px-2 border-r-0' type="text" name="comment" placeholder="Add a comment" />
                            <button className='btn bg-orange-400 border-[1.2rem] pb-3 border-orange-400 text-white rounded-none' type="submit">Comment</button>
                        </div>
                    </form>
                </div>
                <div className="Demo__container flex gap-3 px-2 mt-10">
                    <div className="Demo__some-network">
                        <FacebookShareButton url={shareUrl} quote={`${title} - ${description}`} className="Demo__some-network__share-button">
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <div>
                            <FacebookShareCount url={shareUrl} className="Demo__some-network__share-count">
                                {count => count}
                            </FacebookShareCount>
                        </div>
                    </div>
                    <div className="Demo__some-network">
                        <TwitterShareButton
                            url={shareUrl}
                            title={`${title} - ${description}`}
                            className="Demo__some-network__share-button"
                        >
                            <XIcon size={32} round />
                        </TwitterShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <WhatsappShareButton
                            url={shareUrl}
                            title={`${title} - ${description}`}
                            separator=":: "
                            className="Demo__some-network__share-button"
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                    </div>
                    <div className="Demo__some-network">
                        <LinkedinShareButton url={shareUrl} title={title} summary={description} className="Demo__some-network__share-button">
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </div>
                </div>
            </div>
            <div>
                {postData?.comments?.slice(0, commentsToShow).reverse().map((item, index) => (
                    <div key={index} className='p-2 border-2 md:w-1/2 rounded-r-xl grid gap-3 border-green-500'>
                        <p className='text-orange-400'>{item?.name}</p>
                        <p>
                            {expandedComments[index] ? item?.comment : `${item?.comment.slice(0, 20)}...`}
                            {item?.comment.length > 20 && (
                                <button onClick={() => handleReadMoreClick(index)} className="text-blue-500">
                                    {expandedComments[index] ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                        </p>
                        <div className='flex gap-3'>
                            <select className='select select-bordered' onChange={(e) => handleFeedbackChange(e, index)}>
                                <option value="">Select reason</option>
                                <option value="Spam">Spam</option>
                                <option value="Offensive">Offensive</option>
                                <option value="Other">Other</option>
                            </select>
                            <button className="btn" disabled={!feedbackStates[index]?.selectedFeedback} onClick={()=>document.getElementById('my_modal_5').showModal()}>Report</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
    <div className="modal-action">
    <form onSubmit={buttonControl} method="dialog">
      <p className='my-1'>Write details about your report :</p>
      <textarea placeholder='Report...' className='px-2 textarea w-full  textarea-accent' name="reportDescription" id=""></textarea>
        <input type="submit"  value="Submit Report" className='btn btn-sm my-2' />
      </form>
      <div>
      <form method="dialog">
        <button className="btn btn-sm relative -top-16"><i className="text-2xl fa-solid fa-xmark"></i></button>
      </form>
      </div>
    </div>
  </div>
</dialog>

                        </div>
                    </div>
                ))}
            </div>
            {postData?.comments?.length > 4 && commentsToShow < postData.comments.length && (
                <button onClick={handleShowMore} className='btn bg-blue-400 text-white rounded-none'>Show More</button>
            )}
            {commentsToShow >= postData.comments.length && postData.comments.length > 4 && (
                <button onClick={handleShowLess} className='btn bg-blue-400 text-white rounded-none'>Show Less</button>
            )}
        </div>
    );
};

export default PostCart;
