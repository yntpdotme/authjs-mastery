import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

const SettingsPageSkeleton = () => {
  return (
    <Card className="mb-5 w-[90%] sm:w-[610px]">
      <CardHeader>
        <Skeleton className="mx-auto h-8 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Password Fields */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Two Factor Authentication */}
            <div className="flex items-center space-x-4">
              <div className="flex-grow space-y-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-2 w-[250px]" />
              </div>
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>

          {/* Save Button */}
          <Skeleton className="h-8" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPageSkeleton;
