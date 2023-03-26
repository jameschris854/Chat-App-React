class UserUtil {

    static getOtherUserFromMemberList = (members:any[],profile:any) => {
        return members[0]._id != profile._id ? members[0] : members[1];
    }

}

export default UserUtil;