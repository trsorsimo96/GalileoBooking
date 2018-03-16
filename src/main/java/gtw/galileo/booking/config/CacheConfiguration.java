package gtw.galileo.booking.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(gtw.galileo.booking.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Airline.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Agency.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Agent.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Corporate.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Passenger.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.AirLoyalty.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.GroupAirlineAlliance.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Currency.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Airport.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Town.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Segment.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.PhoneInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.EmailInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.AddressInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.ConfigFees.class.getName(), jcacheConfiguration);
            cm.createCache(gtw.galileo.booking.domain.Booking.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
