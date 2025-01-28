#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(MyNativeModule, RCTEventEmitter)
RCT_EXTERN_METHOD(triggerEvent)
@end

@implementation MyNativeModule

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"event"];
}

RCT_EXPORT_METHOD(triggerEvent) {
  [self sendEventWithName:@"event" body:@{@"data": @"Event data"}];
}

@end