import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GrEdit } from 'react-icons/gr';
import { MdOutlineDelete } from 'react-icons/md';
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { SelectAvatar } from '@components/index';
import { USERS_PROFILES } from '../dummy-data';
import { IUserProfile } from '../interfaces';

const DEFAULT_USER: IUserProfile = {
  id: '101',
  username: 'admin',
  avatar: '/images/avatars/avatar1',
  reactions: 0,
  posts: [],
};

const ProfilePage = () => {
  const [isMyProfile, setIsMyProfile] = useState(true);
  const [avatar, setAvatar] = useState('/images/avatars/avatar1');
  const [user, setUser] = useState<IUserProfile>(DEFAULT_USER);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    //TODO Fetch user data
    const user = USERS_PROFILES.find(user => user.id === id);
    if (!user) return;
    setUser(user);
    setIsMyProfile(true);
  }, [id]);

  const handleUsernameChange = (e: ChangeEvent) => {
    setUser({ ...user, username: (e.target as HTMLInputElement).value });
  };

  const handleChangeDeleteProfile = (e: ChangeEvent) => {
    console.log((e.target as HTMLInputElement).value);
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
            <AvatarImage src={avatar} />
          </Avatar>
        </div>
        <span>Username: {user.username}</span>
        <Link to={`/profile/${id}/threads`} className="hover:underline">
          <span>Posts: {user.posts.length}</span>
        </Link>
        <span>Reactions on their posts: </span>
      </CardContent>
      {isMyProfile && (
        <CardFooter className="flex justify-between">
          <Sheet>
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
                  <SelectAvatar setAvatar={setAvatar} selected={user.avatar} />
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                  </Avatar>
                </div>
                <form className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={handleUsernameChange}
                    className="col-span-3"
                  />
                </form>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
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
                <span className="text-center">Username: {user.username}</span>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    onChange={handleChangeDeleteProfile}
                    type="password"
                    id="password"
                    value={''}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">I want to delete my profile</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfilePage;
