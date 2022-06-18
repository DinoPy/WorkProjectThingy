import axios from 'axios';

const API_URL = 'api/lists/';

/**
 *  FETCH LISTS
 */

const fetchLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

/**
 *  CREATE LIST
 */

const addList = async (name, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, { name }, config);
    return response.data;
};

/**
 *   ADD ITEM TO THE LIST
 */

const addItem = async (listId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(
        API_URL + listId.listId,
        { content: listId.content },
        config
    );

    return response.data;
};

/**
 *   REMOVE LIST
 */

const removeList = async (listId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + listId, config);
    return response.data;
};

/**
 *   REMOVE ITEM
 */

const removeItem = async (obj, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(
        API_URL + obj.listId + '/' + obj.itemId,
        config
    );
    return response.data;
};

/**
 * EDIT LIST
 */

const editList = async ({ listId, obj }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const data = {
        newName: obj.newName,
        newDescription: obj.newDescription,
    };

    const response = await axios.put(API_URL + listId, data, config);
    return response.data;
};

const listService = {
    fetchLists,
    addList,
    addItem,
    removeList,
    removeItem,
    editList,
};

export default listService;
