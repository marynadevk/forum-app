import { ChangeEvent, useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@ui/card';
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

const ProfilePage = () => {
  const [isMyProfile, setIsMyProfile] = useState(true);
  const [avatar, setAvatar] = useState('/images/avatars/avatar1');
  const [username, setUsername] = useState('@johndoe'); // Add state for username

  useEffect(() => {
    //TODO Fetch user data
    setIsMyProfile(true);
  }, []);

  const handleUsernameChange = (e: ChangeEvent) => {
    setUsername((e.target as HTMLInputElement).value);
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
        <span>Username: admin</span>
        <span>Posts: </span>
        <span>Reactions on their posts: </span>
      </CardContent>
      {isMyProfile && (
        <CardFooter>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Edit Profile</Button>
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
                  <SelectAvatar setAvatar={setAvatar} selected={avatar} />
                  <Avatar>
                    <AvatarImage src={avatar} />
                  </Avatar>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProfilePage;
