export const getUrlForRequest = (path) =>
  process.env.REACT_APP_IS_THE_SAME_HOST.toUpperCase() === 'TRUE'
    ? path
    : `${process.env.REACT_APP_OVERWRITE_HOST}${
        path[0] === '/' ? path : `/${path}`
      }`;
