const jwt = require("jsonwebtoken");
const Admin = require("./model/admin/adminSchema");
const status = require("http-status");
const roles = require("./utils/roles");
const adminAuth = (role) => {
  return async (req, res, next) => {
    try {
      const accessToken = req.cookies["accessToken"];
      const refreshToken = req.cookies["refreshToken"];
      let data;
      if (refreshToken) {
        let accessTokenDecoded;
        if (accessToken) {
          accessTokenDecoded = jwt.verify(
            accessToken,
            process.env.ADMIN_ACCESS_TOKEN_SECRET
          );
        }
        const refreshTokenDecoded = jwt.verify(
          refreshToken,
          process.env.ADMIN_REFRESH_TOKEN_SECRET
        );
        if (
          accessTokenDecoded &&
          refreshTokenDecoded &&
          accessTokenDecoded._id === refreshTokenDecoded._id
        ) {
          data = await Admin.findOne({
            _id: accessTokenDecoded._id,
          });
          const isAllowed = roles[data.role].find((val) => val === role);
          if (!isAllowed) {
            throw {
              status: status.UNAUTHORIZED,
              message: {
                text: "Anauthorized access",
              },
            };
          }
          req.admin = data;
        } else if (refreshTokenDecoded) {
          throw {
            status: status.FORBIDDEN,
            message: {
              text: "invalid access",
              refreshTokenDecoded: true,
            },
          };
        }
      } else {
        throw {
          status: status.UNAUTHORIZED,
          message: {
            text: "You need to login",
            // text: "unAuthorized access",
          },
        };
      }
      next();
    } catch (err) {
      res.status(err.status || 404).send(err.message || "somthing went wrong!");
    }
  };
};
// const adminAuth = async (req, res, next) => {
//   try {
//     const accessToken = req.cookies["accessToken"];
//     const refreshToken = req.cookies["refreshToken"];
//     let data;
//     if (refreshToken) {
//       let accessTokenDecoded;
//       if (accessToken) {
//         accessTokenDecoded = jwt.verify(
//           accessToken,
//           process.env.ADMIN_ACCESS_TOKEN_SECRET
//         );
//       }
//       const refreshTokenDecoded = jwt.verify(
//         refreshToken,
//         process.env.ADMIN_REFRESH_TOKEN_SECRET
//       );
//       if (
//         accessTokenDecoded &&
//         refreshTokenDecoded &&
//         accessTokenDecoded._id === refreshTokenDecoded._id
//       ) {
//         data = await Admin.findOne({
//           _id: accessTokenDecoded._id,
//         });
//         if (data.role === process.env.SUPER_ADMIN) {
//           req.admin = data;
//         } else {
//           throw {
//             status: status.UNAUTHORIZED,
//             message: {
//               text: "Auauthorized access",
//             },
//           };
//         }
//       } else if (refreshTokenDecoded) {
//         throw {
//           status: status.FORBIDDEN,
//           message: {
//             text: "invalid access",
//             refreshTokenDecoded: true,
//           },
//         };
//       }
//     } else {
//       throw {
//         status: status.UNAUTHORIZED,
//         message: {
//           text: "You need to login",
//           // text: "unAuthorized access",
//         },
//       };
//     }
//     next();
//   } catch (err) {
//     res.status(err.status || 404).send(err.message || "somthing went wrong!");
//   }
// };
const verifyAdmin = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    let data;
    if (refreshToken) {
      let accessTokenDecoded;
      if (accessToken) {
        accessTokenDecoded = jwt.verify(
          accessToken,
          process.env.ADMIN_ACCESS_TOKEN_SECRET
        );
      }
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        process.env.ADMIN_REFRESH_TOKEN_SECRET
      );
      if (
        accessTokenDecoded &&
        refreshTokenDecoded &&
        accessTokenDecoded._id === refreshTokenDecoded._id
      ) {
        data = await Admin.findOne({
          _id: accessTokenDecoded._id,
        });
        req.admin = data;
      } else if (refreshTokenDecoded) {
        throw {
          status: status.FORBIDDEN,
          message: {
            text: "invalid access",
            refreshTokenDecoded: true,
          },
        };
      }
    } else {
      req.admin = data;
    }
    next();
  } catch (err) {
    res.status(err.status || 404).send(err.message || "somthing went wrong");
  }
};
const verifyAdminRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    let data;
    if (refreshToken) {
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        process.env.ADMIN_REFRESH_TOKEN_SECRET
      );
      if (refreshTokenDecoded) {
        data = await Admin.findOne({
          _id: refreshTokenDecoded._id,
        });
        req.admin = data;
      }
    } else {
      throw {
        status: status.FORBIDDEN,
        message: {
          text: "anAuthorized access",
        },
      };
    }
    next();
  } catch (err) {
    res.status(err.status || 404).send(err.message || "Somthing Went Wrong!");
  }
};

module.exports = { adminAuth, verifyAdmin, verifyAdminRefreshToken };
