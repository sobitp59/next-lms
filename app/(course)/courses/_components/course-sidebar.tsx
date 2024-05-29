import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import { ICourseSidebarProps } from "@/lib/interfaces";
import { checkExistence } from "@/app/(dashboard)/client-utils";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import { ArrowLeft } from "lucide-react";

export const CourseSidebar = async({
    course,
    progress
}: ICourseSidebarProps): Promise<JSX.Element> => {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);
    
    const _purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: userId!,
                courseId: course.id
            }
        }
    });

    return (
      <div
        className="h-full border-r flex flex-col 
            bg-slate-200 overflow-y-auto shadow-sm"
      >
        <div className="p-7 flex flex-col border-b border-b-white">
          <h1 className="font-semibold">{course.title}</h1>
          {_purchase && (
            <div className="mt-10">
              <CourseProgress variant="success" value={progress} />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          {course.chapters.map((ch) => (
            <CourseSidebarItem
              key={ch.id}
              id={ch.id}
              label={ch.title}
              isCompleted={!!ch.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!ch.isFree && !_purchase}
            />
          ))}
        </div>
        <Link
          href={`/`}
          className="flex md:hidden justify-end mr-3 items-center text-sm hover:opacity-75 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to dashboard
        </Link>
      </div>
    );
}