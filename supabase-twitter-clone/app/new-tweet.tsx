import { createServerActionClient, User } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";

export default function NewTweet({user}:{user: User}) {
    const addTweet = async (formData: FormData) => {
        'use server';
        const title = String(formData.get('title'));
        const supabase = createServerActionClient<Database>({ cookies });
            await supabase.from('tweets').insert({
                title,
                user_id: user.id
            });
            revalidatePath('/');
    };
    return (
        <form className="border border-gray-800 border-t-0" action={addTweet}>
            <div className="flex py-8 px-4">
                <div className="h-12 w-12">
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt="user avatar"
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </div>
                <input name="title" className="bg-inherit flex-1 ml-2 text-2xl placeholder-gray-500 leading-loose px-2" placeholder="いまどうしてる？" />
            </div>
        </form>
    )
}