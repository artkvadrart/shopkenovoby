function InputCategoryPage() { 

  console.dir(formDefaultValues, { depth: null }); 

  for (const key in formSchema) { 
    console.log(`--key:${key}--`);    
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formDefaultValues      
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

    // console.dir(languages, { depth: null })

  return (
    <div>      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path</FormLabel>
              <FormControl>
                <Input placeholder="path" {...field} />
              </FormControl>
              <FormDescription>
                This is path.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="top"
          render={({ field }) => (
            <FormItem>
              <FormLabel>top</FormLabel>
              <FormControl>
                <Checkbox 
                checked={field.value}
                onCheckedChange={field.onChange}
                 />
                {/* <Checkbox placeholder="top" {...field} /> */}
              </FormControl>
              <FormDescription>
                This is top.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <FormControl>
                <Input placeholder="status" {...field} />
              </FormControl>
              <FormDescription>
                This is status.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>parentId</FormLabel>
              <FormControl>
                <Input placeholder="parentId" {...field} />
              </FormControl>
              <FormDescription>
                This is parentId.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


         <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>avatar</FormLabel>
              <FormControl>
                <Input placeholder="avatar" {...field} />
              </FormControl>
              <FormDescription>
                This is avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <Input placeholder="image" {...field} />
              </FormControl>
              <FormDescription>
                This is image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>images</FormLabel>
              <FormControl>
                <Input placeholder="images" {...field} />
              </FormControl>
              <FormDescription>
                This is images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>fUrl</FormLabel>
              <FormControl>
                <Input placeholder="fUrl" {...field} />
              </FormControl>
              <FormDescription>
                This is fUrl.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code1c"
          render={({ field }) => (
            <FormItem>
              <FormLabel>code1c</FormLabel>
              <FormControl>
                <Input placeholder="code1c" {...field} />
              </FormControl>
              <FormDescription>
                This is code1c.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codeChange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>codeChange</FormLabel>
              <FormControl>
                <Input placeholder="codeChange" {...field} />
              </FormControl>
              <FormDescription>
                This is codeChange.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>



    </div>
  )
}
export default InputCategoryPage


'use client'
import { use } from 'react'
import { useForm } from 'react-hook-form';
 
export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)
 
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

name: string;
id: number;
status: boolean;
image: string;
createdAt: Date;
updatedAt: Date;
language: $Enums.Language;
code: string;
sort_order: number;
locale: string;
time: string;
colorText: string;
colorBackground: string;