import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { deleteUserProfile, getUserProfile, updateUserProfile } from 'src/api';
import { handleError } from 'src/helpers/errorHandler';
import { IUserProfile } from 'src/interfaces';
import useUserStore from 'src/store/authorized-user.store';
import useTokenStore from 'src/store/token.store';
import { Avatar, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { SelectAvatar } from '@components/index';

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [password, setPassword] = useState('');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const postCount = profile?.posts || 0;
  const { removeToken } = useTokenStore();
  const id = params.id;
  const authUserId = user?.id;
  const isMyProfile = id == authUserId;
  const [userChangeableData, setUserChangeableData] = useState({
    username: user?.username as string,
    avatar: user?.avatar as string,
  });
  console.log(profile, 'profile');
  useEffect(() => {
    setUserChangeableData({
      username: user?.username as string,
      avatar: user?.avatar as string,
    });
  }, [user]);

  useEffect(() => {
    if (!id) return;
    getUserProfile(id).then(setProfile);
  }, [id]);

  const handleSaveChanges = async () => {
    if (!id) return;
    try {
      if (userChangeableData.username.length < 2) {
        throw new Error('Username must be at least 2 characters long');
      }
      const updatedUser = await updateUserProfile(id, userChangeableData);
      setUser({ ...user, ...updatedUser });
      setProfile(updatedUser);
      toast.success('Profile updated successfully');
      setSheetOpen(false);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username' && user) {
      setUserChangeableData(prev => ({
        ...prev,
        username: value,
      }));
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleDeleteProfile = async () => {
    if (!password) {
      toast.error('Password is required to delete your profile.');
      return;
    }
    try {
      await deleteUserProfile(authUserId!, password);
      toast.success('Profile deleted successfully');
      setUser(null);
      setProfile(null);
      removeToken();
      navigate('/signup');
    } catch (error) {
      handleError(error);
    } finally {
      setPassword('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="custom-heading">Profile</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5">
          Avatar:
          <Avatar>
            <AvatarImage src={profile?.avatar} />
          </Avatar>
        </div>
        <span>Username: {profile?.username}</span>
        <Link to={`/profile/${id}/threads`} className="hover:underline">
          <span>Posts: {postCount}</span>
        </Link>
        <span>Reactions on their posts: {profile?.impressions}</span>
      </CardContent>
      {isMyProfile && (
        <CardFooter className="flex justify-between">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <GrEdit /> profile
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Avatar
                  </Label>
                  <SelectAvatar
                    setAvatar={setUserChangeableData}
                    selectedProps={userChangeableData?.avatar}
                  />
                  <Avatar>
                    <AvatarImage src={userChangeableData?.avatar} />
                  </Avatar>
                </div>
                <form className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder={`your username is: ${user?.username}`}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </form>
              </div>
              <SheetFooter>
                <Button type="button" onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <MdOutlineDelete /> profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>PAY ATTENTION!</DialogTitle>
                <DialogDescription>
                  Your profile will be permanently deleted. This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <span className="text-center">
                  Username: {profile?.username}
                </span>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleDeleteProfile}>
                  I want to delete my profile
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfilePage;
