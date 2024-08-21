import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axios';
import { useStateContext } from '../../contexts/ContextProvider';
import PostDesc from '../../components/PostDesc';
import { BsUpload } from 'react-icons/bs';
import { FaArrowUp, FaComments, FaUserCircle } from 'react-icons/fa';
import Loading from '../../components/Loading';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const DashMain = () => {
  const { user } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCommentsModal = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId);
    setIsCommentsModalOpen(true);
  };
  const closeCommentsModal = () => setIsCommentsModalOpen(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/posts/${user.residence_id}`);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoading(false);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axiosClient.get(`/comments/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user.residence_id]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description || '');
    if (image) formData.append('image', image);
    formData.append('poster_id', user.id);
    formData.append('residence_id', user.residence_id);

    try {
      await axiosClient.post('/addPost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      closeModal();
      setTitle('');
      setDescription('');
      setImage(null);
      fetchPosts();
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const commenterId = user.id;

      const commentData = {
        comment,
        commenter_Id: commenterId,
        postId: postId
      };

      console.log(commentData);

      await axiosClient.post('/addComment', commentData);

      setComment('');
      alert('Comment submitted successfully!');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-6 flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Dashboard</h1> {/* Smaller text on mobile */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded transition duration-300 ease-in-out text-xs md:text-sm" /* Adjust text size */
          onClick={openModal}
        >
          Add Post <span className="text-lg">+</span>
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex-grow p-2 md:p-6">
          {posts.map((post, i) => (
            <div
              key={i}
              className="bg-gray-50 p-4 md:p-6 rounded shadow-md mb-6 relative max-w-md md:max-w-lg lg:max-w-xl mx-auto"
            >

              <div className="absolute top-2 right-2 text-gray-500 text-xs md:text-sm"> {/* Adjust text size */}
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center mb-4">
                {post.user.image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${post.user.image}`}
                    alt={post.user.Nom}
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full mr-2 md:mr-4 object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full mr-2 md:mr-4 bg-blue-500 flex items-center justify-center text-white font-bold">
                    {post.user.Nom[0].toUpperCase()}{post.user.Prenom[0].toUpperCase()}
                  </div>
                )}


                <div>
                  <h2 className="text-base md:text-lg font-bold"> {/* Smaller text on mobile */}
                    {post.user.Prenom} {post.user.Nom}
                    {post.user.Type === 'Admin' && (
                      <span className="text-yellow-500 ml-2 font-semibold">Admin</span>
                    )}
                  </h2>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{post.titre}</h3> {/* Smaller text on mobile */}
              <div className="text-gray-700 text-sm md:text-base break-words mb-4">
                <PostDesc text={post.description} />
              </div>
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${post.image}`}
                  alt="Post image"
                  className="w-full h-64 md:h-80 object-cover rounded-md mb-4" /* Adjust image size */
                />
              )}
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0">
               <textarea
  className="w-full border rounded p-2 text-xs md:text-base focus:border-slate-800 focus:outline-none md:w-3/4"
  placeholder="Add a comment..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
></textarea>
<button
  className={`mt-2 md:mt-0 md:ml-2 font-bold py-2 px-2 rounded-3xl transition duration-300 ease-in-out text-xs md:text-sm ${
    comment.trim() === ''
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-slate-800 hover:bg-slate-600 text-white'
  }`}
  onClick={() => handleCommentSubmit(post.post_id)}
  disabled={comment.trim() === ''}
>
  <FaArrowUp />
</button>

                <button
                  className="mt-2 md:mt-0 md:ml-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-2 rounded-3xl transition duration-300 ease-in-out text-xs md:text-sm"
                  onClick={() => openCommentsModal(post.post_id)}
                >
                  <FaComments /> View Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-6 bg-white mx-8 md:mx-0 shadow rounded-2xl sm:p-6">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-yellow-200 rounded-full flex justify-center items-center text-yellow-500 text-xl font-mono">i</div>
                  <div className="block pl-2 font-semibold text-lg text-gray-700">
                    <h2 className="leading-snug">New Post</h2>
                    <p className="text-xs text-gray-500 font-normal">Create a new post then press the Post button.</p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="py-4 text-base leading-6 space-y-3 text-gray-700 sm:text-sm">
                    <div className="flex flex-col">
                      <label className="leading-tight">Post Title</label>
                      <input
                        type="text"
                        className="px-3 py-1 border focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Event title"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-tight">Description</label>
                      <textarea
                        className="px-3 py-1 border focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-tight">Image</label>
                      <input
                        type="file"
                        className="px-3 py-1 border focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div className="pt-4 flex flex-col md:flex-row items-center space-x-2">
                    <button
                      className="flex justify-center items-center w-full text-gray-900 px-3 py-2 rounded-md focus:outline-none hover:text-red-700 transition duration-300 ease-in-out"
                      onClick={closeModal}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 flex justify-center rounded items-center w-full text-white px-3 py-2 focus:outline-none"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {isCommentsModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-14 w-14 bg-blue-200 rounded-full flex flex-shrink-0 justify-center items-center text-blue-500 text-2xl font-mono">C</div>
                  <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                    <h2 className="leading-relaxed">Comments</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">View comments for this post.</p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 mt-4">
                  {comments.length === 0 ? (
                    <p className="text-center text-gray-500">No comments available.</p>
                  ) : (
                    <div className="max-h-64 overflow-y-auto"> {/* Set the max height and enable scrolling */}
                      {comments.map((comment, i) => (
                        <div key={i} className="bg-gray-100 p-4 text-sm rounded-lg shadow-md mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              {comment.user.image ? (
                                <img
                                  src={`http://127.0.0.1:8000/storage/${comment.user.image}`}
                                  alt={`${comment.user.Prenom} ${comment.user.Nom}`}
                                  className="h-8 w-8 rounded-full object-cover mr-2"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
                                  {`${comment.user.Nom[0]}${comment.user.Prenom[0]}`}
                                </div>
                              )}


                              <p className="font-semibold mr-10">{comment.user.Prenom} {comment.user.Nom}</p>
                            </div>
                            <p className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleString()}</p>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col md:flex-row items-center space-x-4">
                  <button
                    className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none hover:text-red-700 transition duration-300 ease-in-out"
                    onClick={closeCommentsModal}
                  >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashMain;
