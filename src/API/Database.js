import {
  databaseInstance,
  ref,
  set,
  child,
  get,
  auth,
  update,
} from '../Firebase/firebase';
import { v4 } from 'uuid';

export const PROFILE_DEFAULT_IMG =
  'https://firebasestorage.googleapis.com/v0/b/sweet-be7c5.appspot.com/o/images%2Ftwitter_default.png?alt=media&token=d22275c7-6474-4fc9-9cee-98c1739dae00';

const DB_REF = ref(databaseInstance);

const database = {
  fetchData: async function (table) {
    /**
     * @params {String} table : users, tweets
     */
    const lists = [];
    try {
      const userLists = await get(child(DB_REF, `${table}/`));
      userLists.forEach((item) => {
        lists.push(item.val());
      });
      return { data: lists, error: false };
    } catch (error) {
      return { data: null, error: true, message: error };
    }
  },
  createUser: async function (userId, username, email) {
    try {
      await set(ref(databaseInstance, `users/user-${userId}`), {
        userId,
        username,
        email,
        profileImg: PROFILE_DEFAULT_IMG,
        tweetId: ['none'],
      });
    } catch (error) {
      alert(
        '유저 정보를 저장하는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
  },
  updateUserInfo: async function (userinfo) {
    const { displayName, photoURL } = userinfo;
    const updates = {};

    try {
      const {
        currentUser: { uid },
      } = auth;
      if (displayName) {
        updates[`users/user-${uid}/username`] = displayName;
      }
      if (photoURL) {
        updates[`users/user-${uid}/profileImg`] = photoURL;
      }

      update(DB_REF, updates);
      return { success: true };
    } catch (error) {
      alert(
        '사용자 정보 업데이트에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      return { success: false };
    }
  },
  fetchUserLikedTweet: async function () {
    const {
      currentUser: { uid },
    } = auth;

    try {
      const userLikedTweets = await (
        await get(child(DB_REF, `users/user-${uid}/liketweets`))
      ).val();

      return {
        success: true,
        likeTweets: userLikedTweets ?? [],
      };
    } catch (error) {
      return { success: false, likeTweets: null };
    }
  },
  updateUserTweetId: async function (add, tweetId) {
    /**
     * @params {String} add : add ? update New PostId : remove existing PostId
     * @params {String} tweetId : tweetId
     */
    const {
      currentUser: { uid },
    } = auth;

    try {
      const updates = {};
      const userTweetIdArray =
        (await (await get(child(DB_REF, `users/user-${uid}/tweetId`))).val()) ??
        [];

      if (userTweetIdArray?.length === 1 && userTweetIdArray[0] === 'none') {
        userTweetIdArray.pop();
      }

      add
        ? (updates[`/users/user-${uid}/tweetId`] = [
            ...userTweetIdArray,
            tweetId,
          ])
        : (updates[`/users/user-${uid}/tweetId`] = userTweetIdArray.filter(
            (id) => id !== tweetId
          ));

      update(DB_REF, updates);
      return { success: true };
    } catch (error) {
      alert(
        '트윗을 업데이트 하는 데 문제가 발생했습니다.. 작성하신 트윗이 삭제됩니다..'
      );
      return { success: false };
    }
  },
  updateUserLikesTweets: async function (tweetId, like) {
    try {
      const {
        currentUser: { uid },
      } = auth;

      let { success, likeTweets } = await database.fetchUserLikedTweet();
      if (success) {
        const updates = {};
        like
          ? likeTweets.push(tweetId)
          : (likeTweets = likeTweets.filter((tweet) => tweet !== tweetId));
        updates[`/users/user-${uid}/liketweets`] = likeTweets;
        update(DB_REF, updates);
      } else {
        throw new Error('좋아요 업데이트 실패');
      }
    } catch (error) {
      alert(error.message);
    }
  },
  fetchUserTweet: async function () {
    const userTweetArray = [];
    const {
      currentUser: { uid },
    } = auth;

    try {
      const userTweetIds = await (
        await get(child(DB_REF, `users/user-${uid}/tweetId`))
      ).val();

      if (userTweetIds[0] !== 'none') {
        for (let id of userTweetIds) {
          const writtenPost = await (
            await get(child(DB_REF, `tweets/tweet-${id}`))
          ).val();
          userTweetArray.push(writtenPost);
        }
      }

      return { success: true, response: userTweetArray };
    } catch (error) {
      alert(error);
      return { success: false, error: error.message };
    }
  },
  uploadTweet: async function (text, hashtag, images) {
    const uuid = v4();
    const {
      currentUser: { uid },
    } = auth;

    try {
      await set(ref(databaseInstance, `tweets/tweet-${uuid}`), {
        text,
        hashtag,
        images,
        likes: 0,
        userId: uid,
        timestamp: Date.now(),
        tweetId: uuid,
      });
      return { success: true, tweetId: uuid };
    } catch (error) {
      alert(
        '트윗을 생성하는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );
      return { success: false, message: error };
    }
  },
  updateTweetLikes: async function (tweetId, like) {
    try {
      const count = await (
        await get(child(DB_REF, `tweets/tweet-${tweetId}/likes`))
      ).val();
      const updates = {};
      updates[`tweets/tweet-${tweetId}/likes`] = like ? count + 1 : count - 1;
      update(DB_REF, updates);
    } catch (error) {
      alert(error.message);
    }
  },
  removeTweet: async function (tweetId) {
    try {
      await set(ref(databaseInstance, `tweets/tweet-${tweetId}`), null);
    } catch (error) {
      alert('트윗 삭제가 완료되지 않았습니다.');
    }
  },
};

export default database;
