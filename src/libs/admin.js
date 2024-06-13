import { useUser } from "@clerk/clerk-react";

const allowedIds = ["user_2gVeuB5zrhaY89eIYgPBXktpIK0"];

export const isAdmin = () => {
    const { user } = useUser();


    if (!user) {
        return false;
    }

    return allowedIds.indexOf(user) !== -1;
};
