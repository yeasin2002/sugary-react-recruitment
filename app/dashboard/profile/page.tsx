"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { getImg } from "@/lib/getImg";
import { useState } from "react";

export default function UserProfile() {
  const { user } = useAuth();
  const avatarUrl = getImg(user?.Avatar);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    { id: 2, name: "Jamie Lee", avatar: "/placeholder.svg?height=40&width=40" },
    {
      id: 3,
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Morgan Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  if (!user) return <div>Loading</div>;

  return (
    <div className="container mx-auto">
      <div className="flex h-screen w-full overflow-hidden ">
        {/* Left side - Photo with yellow background */}
        <div className="relative w-1/2 bg-yellow-300 flex items-center justify-center">
          <div className="absolute top-0 right-0 h-16 w-16 bg-yellow-400"></div>
          <div className="absolute bottom-0 left-0 h-16 w-16 bg-yellow-400"></div>
          <div className="w-4/5 h-4/5 flex items-center justify-center">
            <Avatar className="w-full h-full rounded-none">
              <AvatarImage
                src={avatarUrl}
                alt={user.FullName}
                className="object-cover"
              />
              <AvatarFallback className="text-9xl bg-yellow-200 w-full h-full rounded-none">
                {user.FullName.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Right side - User information */}
        <div className="w-1/2 bg-white p-12 flex items-center">
          <Card className="w-full border-none shadow-none">
            <CardContent className="p-0 space-y-10">
              {/* Name section */}
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Name</p>
                <h1 className="text-3xl font-semibold">{user.FullName}</h1>
              </div>
              {/* Position section */}
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Position</p>
                <h2 className="text-2xl font-medium">{user.Role.Title}</h2>
              </div>
              {/* Followers/Following section */}
              <div className="flex space-x-12">
                <div>
                  <p className="text-gray-400 text-sm">Followers</p>
                  <p className="text-2xl font-medium">64</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Following</p>
                  <p className="text-2xl font-medium">326</p>
                </div>
              </div>
              {/* Team section */}
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">Team</p>
                <div className="flex -space-x-2">
                  {teamMembers.map((member) => (
                    <Avatar
                      key={member.id}
                      className="border-2 border-white h-10 w-10"
                    >
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-gray-200 text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              {/* Additional user info - not in the image but from your data */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-base">{user.Email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Country</p>
                  <p className="text-base">{user.GiftingCountry.Name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Currency</p>
                  <p className="text-base">
                    {user.Currency.Symbol} {user.Currency.Id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
